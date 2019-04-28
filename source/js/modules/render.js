export const render = (template, data) => {
  return require(`../../view/templates/${template}.hbs`)(data);
};
