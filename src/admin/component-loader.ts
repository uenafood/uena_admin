import { ComponentLoader } from 'adminjs';

const componentLoader = new ComponentLoader();

const Components = {
  listItem: componentLoader.add('ListItem', './components/ListItem'),
  // other custom components
};

export { componentLoader, Components };
