const body =document.querySelector('body')
const container = document.querySelector('#quote-container')
const author = document.querySelector('#author')
const quote = document.querySelector('#quote')
const quoteBtn=document.querySelector('#new-quote')
const clipboard=document.querySelector('#copy-quote')
const copied =document.querySelector('#copy-section')
const twitterShare=document.querySelector('#share-twitter')
const exportedImage=document.querySelector('#export-quote')
console.log(quote)



quoteBtn.addEventListener("click",()=>{
    fetch('https://api.freeapi.app/api/v1/public/quotes/quote/random')
    .then((response)=>{
        return response.json()
    })
    .then((responseData)=>{
        quote.innerText=responseData.data.content
        author.innerText= `- ${responseData.data.author}`
    })
    .catch((err)=>{
        console.log(`error fecting the data` ,err)
    })

})


clipboard.addEventListener("click",()=>{
    navigator.clipboard.writeText(quote.innerText)
    .then(()=>{
        copied.style.display="block"

        setTimeout(() => {
            copied.style.display="none"
        }, 2000);
    })
    .catch(()=>{
        console.log("error copying the message")
    })
})


twitterShare.addEventListener("click", () => {
    let quoteText = quote.innerText;
    console.log(quoteText)
    let authorText = author.innerText;
    console.log(authorText)

    // Encode text for URL
    let twitterText = encodeURIComponent(`"${quoteText}" ${authorText}`);

    // Use twitterText instead of tweetText
    let twitterURL = `https://twitter.com/intent/tweet?text=${twitterText}`;

    // Open Twitter share URL in a new tab
    window.open(twitterURL, "_blank");
});

console.log(body)
document.body.style.backgroundImage = 'url("https://fastly.picsum.photos/id/722/1920/1080.jpg?hmac=hWsK4GsYhZkjB2v210v1PbzPs8HMOn3z_Y5ws0dRgvM")';
//random image url ,directly picks from the server insraed of of taking a cached one
document.body.style.backgroundSize = "cover";
document.body.style.backgroundPosition = "center";




exportedImage.addEventListener("click", () => {
    // Get the background image URL
    const imageUrl = "https://fastly.picsum.photos/id/722/1920/1080.jpg?hmac=hWsK4GsYhZkjB2v210v1PbzPs8HMOn3z_Y5ws0dRgvM";

    // Create a temporary anchor tag to trigger the download
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = "background-image.jpg"; // Set the file name
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});