const getTextContent = (dom) => {
  let text = '';

  if (dom.type === 'text')
    return dom.raw;

  dom.children.map(element => {
    if (element.type === 'text') {
      text += element.raw
    } else {
      text += getTextContent(element);
    }
  });
  
  return text;
};

module.exports = getTextContent;
