import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { css } from '@emotion/css';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Spinner from '../components/Spinner';
import ToDoGenerator from '../components/ToDoGenerator';
import ToDoList from '../components/ToDoList';
import {
  ApiError,
  callAddTodo,
  callChangeCompleted,
  callChangeName,
  callGetTodoList,
} from '../util/apiUtil';
import { emptyList, UNTITLED } from '../util/constants';
import { isUuid, newUuid } from '../util/uuid';
import type { ListView } from '../util/types';

const errorStyle = css({
  color: '#B00020',
  margin: '10px 0',
});

const describe = (error: unknown) =>
  error instanceof ApiError ? error.message : 'Something went wrong.';

/** The list we hold, tagged with the uuid it belongs to. */
interface Loaded {
  uuid?: string;
  list: ListView;
}

const Home = () => {
  const navigate = useNavigate();
  const { uuid } = useParams();

  const currentUuid = isUuid(uuid) ? uuid : undefined;

  const [loaded, setLoaded] = useState<Loaded>({ list: emptyList });
  const [error, setError] = useState<string | null>(null);

  // A uuid minted for a list that does not exist server-side yet. Kept in a ref
  // so two actions firing back to back on a fresh list share one uuid instead
  // of each minting their own and creating two lists.
  const createdUuidRef = useRef<string | undefined>(undefined);

  // Everything below is derived, so navigating between lists needs no reset:
  // a list is only shown while the url still points at it.
  const toDoList = loaded.uuid === currentUuid ? loaded.list : emptyList;
  const loading = !!currentUuid && loaded.uuid !== currentUuid && !error;

  const ensureUuid = useCallback(() => {
    if (currentUuid) {
      return currentUuid;
    }

    createdUuidRef.current ??= newUuid();
    return createdUuidRef.current;
  }, [currentUuid]);

  useEffect(() => {
    if (!currentUuid) {
      if (uuid) {
        // `navigate` returns a promise in react-router 7; nothing here depends
        // on the transition having settled, so it is discarded deliberately.
        void navigate('/', { replace: true });
      }
      return;
    }

    if (loaded.uuid === currentUuid) {
      return;
    }

    let cancelled = false;

    callGetTodoList(currentUuid)
      .then((list) => {
        if (cancelled) {
          return;
        }

        if (!list) {
          void navigate('/NotFound', { replace: true });
          return;
        }

        setLoaded({ uuid: currentUuid, list });
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(describe(err));
        }
      });

    return () => {
      cancelled = true;
    };
  }, [currentUuid, uuid, loaded.uuid, navigate]);

  const changeName = async (name: string) => {
    // A fresh list is only persisted once it is actually named.
    if (name === UNTITLED && !currentUuid && !createdUuidRef.current) {
      return;
    }

    const target = ensureUuid();

    try {
      setError(null);
      setLoaded({ uuid: target, list: await callChangeName(target, name) });
      if (currentUuid !== target) {
        void navigate(`/${target}`);
      }
    } catch (err) {
      setError(describe(err));
    }
  };

  const addTodo = async (content: string): Promise<boolean> => {
    const target = ensureUuid();

    try {
      setError(null);
      const created = await callAddTodo(target, content);
      setLoaded((prev) => {
        const base = prev.uuid === target ? prev.list : emptyList;
        return {
          uuid: target,
          list: { ...base, todos: [created, ...base.todos] },
        };
      });
      if (currentUuid !== target) {
        void navigate(`/${target}`);
      }
      return true;
    } catch (err) {
      setError(describe(err));
      return false;
    }
  };

  const changeCompleted = async (id: number) => {
    try {
      setError(null);
      const updated = await callChangeCompleted(id);
      setLoaded((prev) => ({
        ...prev,
        list: {
          ...prev.list,
          todos: prev.list.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: updated.completed } : todo
          ),
        },
      }));
    } catch (err) {
      setError(describe(err));
    }
  };

  const newList = () => {
    createdUuidRef.current = undefined;
    setLoaded({ list: emptyList });
    setError(null);
    void navigate('/');
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      {/*
        The handlers below are async but the components treat them as
        fire-and-forget: every failure is caught here and rendered as `error`,
        so there is nothing left for a caller to await.
      */}
      <Header
        name={toDoList.name}
        changeName={(name) => void changeName(name)}
        newList={newList}
      />
      <main>
        <ToDoGenerator addTodo={addTodo} />
        {error && (
          <div className={errorStyle} role='alert'>
            {error}
          </div>
        )}
        <ToDoList
          todos={toDoList.todos}
          changeCompleted={(id) => void changeCompleted(id)}
        />
      </main>
      <Footer />
    </>
  );
};

export default Home;
