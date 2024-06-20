import React, { useState, useEffect } from 'react';
import { Menu } from '../../db/entity/menu.entity.js';
import { Badge } from "@adminjs/design-system";

const MenuTableItem = ({ record }) => {

  let menuSpec = record?.params
  let menuSpecKeys: string[] = Object.keys(menuSpec);
  let menuComponents: string[] = [];

  menuSpecKeys.forEach((spec) => {
    if (/components/i.test(spec)) {
      menuComponents.push(menuSpec[spec]);
    }
  });

  return (
    <ul>
      {
        menuComponents.map(
          (comp) => {
            return comp ?
            (
              <li style={{padding: 8, margin: 5}}>
                <Badge>{comp}</Badge>
              </li>
            ) :
            null
          }
        )
      }
    </ul>
  );
};

export default MenuTableItem;
