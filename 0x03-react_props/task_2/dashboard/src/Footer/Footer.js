import React from 'react'
import './Footer.css'
import { getFullYear, getFooterCopy } from '../utils/utils';
export default function Footer() {
  return (
    <div className='App-footer'>
      <p>
        {getFullYear()} {getFooterCopy()}
      </p>
    </div>
  );
}
