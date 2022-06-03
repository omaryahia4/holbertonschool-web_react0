import React from 'react'
import BodySection from './BodySection';
import './BodySection.css'
import PropTypes from 'prop-types';

export default function BodySectionWithMarginBottom(props) {
  return (
    <div className='bodySectionWithMargin'>
        <BodySection {...props}/>
    </div>
  );
}
BodySectionWithMarginBottom.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};
