import React from 'react';
import { css } from 'emotion';
import Pen from '../images/pen.svg';

interface Props {}

const header = css({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '16px 0',
});

const toDoListName = css({
  fontWeight: 900,
  fontSize: '32px',
  paddingRight: '20px',
});

const editButton = css({
  fontWeight: 'bold',
  color: '#777777',
});

const penSvg = css({
  marginRight: '5px',
});

const newListButton = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'linear-gradient(180deg, #FFD976 0%, #F8BE26 100%)',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  boxSizing: 'border-box',
  boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)',
  borderRadius: '4px',
  fontSize: '16px',
  fontWeight: 'bold',
  width: '100px',
  height: '43px',
});

export const Header = (props: Props) => {
  return (
    <div className={header}>
      <div className={header}>
        <div className={toDoListName}>ragu shopping</div>
        <div className={editButton}>
          <img src={Pen} alt='Pen' className={penSvg} /> Edit
        </div>
      </div>
      <div className={newListButton}>New List</div>
    </div>
  );
};
