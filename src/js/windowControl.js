const expand = document.getElementById('expand');
const close = document.getElementById('close');
const minimize = document.getElementById('minimize');
const titleBar = document.getElementById('title-bar');
let isMaximized  = false;

expand.addEventListener('click', () =>{
  expand.classList.toggle("fa-compress");
  expand.classList.toggle("fa-expand");
});

  minimize.addEventListener('click', () => {
    window.api.send('windowControl', ['minimize']);
    window.api.receive("responseWindowControl", (data) => { console.log(data.strRes); });
  });

  close.addEventListener('click', () => {
    window.api.send('windowControl', ['close']);
    window.api.receive("responseWindowControl", (data) => { console.log(data.strRes); });
  });

  expand.addEventListener('click', () => {
    if(isMaximized){
      window.api.send('windowControl', ['unmaximize']);
      window.api.receive("responseWindowControl", (data) => { console.log(data.strRes); });
      isMaximized =false;
    } else {
      window.api.send('windowControl', ['maximize']);
      window.api.receive("responseWindowControl", (data) => { console.log(data.strRes); });
      isMaximized = true;
    }
  });

window.onbeforeunload = (event) => {
  window.api.send('windowControl', ['remove-all-listeners']);
  window.api.receive("responseWindowControl", (data) => { console.log(data.strRes); });
}
