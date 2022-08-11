import React from 'react';
import styles from '../css/Frame_Container.module.css';
import Title_Container from './Title_Container';

export default function(){
    return (
        <div className={styles.frame}>
            <Title_Container />
        </div>
    );
}