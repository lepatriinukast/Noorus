/* jshint esversion: 8 */

const containerArray = document.querySelectorAll('.editor');
const quillArray = [];

for (let i = 0; i < containerArray.length; i++) {
  let quill = new Quill(containerArray[i], {
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline', 'link'],
    ]
  },
  theme: 'snow'  // or 'bubble'
  });
  quillArray.push(quill);
}

export {quillArray};
