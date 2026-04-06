async function shortenUrl(){

    const url=document.getElementById("urlInput").value;

    const response=await fetch("/shorten",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({url:url})
    });

    const data=await response.text();

    document.getElementById("result").innerText=data;
}