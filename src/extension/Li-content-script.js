console.log("Li yuval invoked!")

let iframe_open = false;
let ifrm = document.getElementById("iframe");

function openIframe() {
  ifrm = document.createElement("iframe");
  ifrm.id = "myFrame"

  ifrm.setAttribute("src", "http://localhost:3000/#/content_script");
  //ifrm.setAttribute("src", "https://sdafni.github.io/job_seeker_webpack/#/content_script");

  ifrm.style.width = "640px";
  ifrm.style.height = "480px";
  ifrm.style.zIndex = "999999999";
  ifrm.style.backgroundColor = "rgb(29, 214, 13)";
  ifrm.style.border ="1px";
  ifrm.style.position="fixed";
  ifrm.style.bottom="0";
  ifrm.style.right="0";
  ifrm.style.marginLeft="100px";
  ifrm.style.marginRight="3px";
  ifrm.style.marginBottom="17px";

  document.body.appendChild(ifrm);
}

function closeIframe(){
  document.body.removeChild(ifrm);
  ifrm = null
}

var jobseeker_button = document.createElement("button");
jobseeker_button.id = "myButton"

jobseeker_button.style.height="60px";
jobseeker_button.style.width="80px";
jobseeker_button.style.position="fixed";
jobseeker_button.style.bottom="0";
jobseeker_button.style.right="0";

jobseeker_button.style.marginLeft="100px";
jobseeker_button.style.marginRight="10px";
jobseeker_button.style.marginBottom="17px";
jobseeker_button.style.borderRadius="3px";
jobseeker_button.style.borderWidth="0px";
jobseeker_button.style.backgroundColor="rgb(184, 213, 226)";
jobseeker_button.style.float="right";
jobseeker_button.style.zIndex="9999999999999";

jobseeker_button.onclick = function() {
  if (ifrm) {
    closeIframe();
  } else {
    openIframe();
  }
};

document.body.appendChild(jobseeker_button);



