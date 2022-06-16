import React from 'react'
import BodySection from './BodySection';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

export default function BodySectionWithMarginBottom(props) {
  return (
    <div className={css(styles.marginBottom)}>
        <BodySection {...props}/>
    </div>
  );
}

const styles = StyleSheet.create({
  marginBottom: {
    marginBottom: '40px'
  },
});

BodySectionWithMarginBottom.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};
