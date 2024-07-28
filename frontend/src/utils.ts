export const getScrollBarWidth = () => {
  if (document.body.scrollHeight === window.innerHeight) {
    return 0;
  }
  let div = document.createElement('div');
  div.style.overflowY = 'scroll';
  div.style.width = '50px';
  div.style.height = '50px';
  // мы должны вставить элемент в документ, иначе размеры будут равны 0
  document.body.append(div);
  let scrolBarlWidth = div.offsetWidth - div.clientWidth;
  div.remove();
  return scrolBarlWidth;
};
