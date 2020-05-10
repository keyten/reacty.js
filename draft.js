function Reacty(Component, element) {
  const instance = new Component();
  instance.update = debounce(() => {
    const newVDOM = instance.render();
    updateComponent(instance._vdom, newVDOM, element.children[0]);
    instance._vdom = newVDOM;
  }, 1);

  if (instance.state) {
    instance.state = getWatchedObject(instance.state, instance.update);
  }
  const vdom = instance.render();
  instance._vdom = vdom;

  const dom = renderVDOM(vdom);
  setDomElementChildren(element, [dom]);

  return instance;
}

function renderVDOM(vdom) {
  const { elem, children, on, ...props } = vdom;
  let element;
  if (typeof elem === "string") {
    element = document.createElement(elem);
    element.textContent = children;
    if (on) {
      Object.keys(on).forEach(evt => {
        element.addEventListener(evt, on[evt]);
      });
    }
  } else {
  }
  return element;
}

function updateComponent(oldVDOM, newVDOM, element) {
  const { elem: oldElem, children: oldChildren, ...oldProps } = oldVDOM;
  const { elem: newElem, children: newChildren, ...newProps } = newVDOM;

  if (newElem !== oldElem) {
    replaceDomElement(element, renderVDOM(newVDOM));
    return;
  }
}

function replaceDomElement(oldElement, newElement) {
  const { parentNode } = oldElement;
  parentNode.insertBefore(newElement, oldElement);
  parentNode.removeChild(oldElement);
}

function setDomElementChildren(element, children) {
  [...element.childNodes].forEach(node => element.removeChild(node));
  children.forEach(node => element.appendChild(node));
}

function getWatchedObject(object, callback) {
  const newObject = {};
  Object.keys(object).forEach(key => {
    Object.defineProperty(newObject, key, {
      get: () => object[key],
      set: value => {
        object[key] = value;
        callback(key, value);
      }
    });
  });
  return newObject;
}

function debounce(fn, time) {
  let isExecuting = false;
  return function() {
    if (isExecuting) {
      return;
    }

    isExecuting = true;
    setTimeout(() => {
      fn.apply(this, arguments);
      isExecuting = false;
    }, time);
  };
}

export default Reacty;
