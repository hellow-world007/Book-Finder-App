const loading = document.querySelector('.loading');

const searchForm=document.querySelector('.search')
const searchInput=document.querySelector('.search__field');
const resultsList=document.querySelector('.results');

// const toggleBtn=document.querySelector('.links .fa-bars')
// const toggleLink=document.querySelector('.links .link')

// toggleBtn.addEventListener('click',function(){
// 	toggleLink.classList.toggle('active')
// })
const navToggle=document.querySelector(".nav-toggle");
const Links=document.querySelector(".links");

navToggle.addEventListener("click",function(){
   Links.classList.toggle("show-links");
});

// const navbar=document.getElementById('nav')
// const topLink=document.querySelector('.top-link')

// window.addEventListener('scroll',function(){
//     const scrollHeight=window.pageYOffset;
//     //console.log(scrollHeight)
//     const navHeight=navbar.getBoundingClientRect().height;
//     if(scrollHeight > navHeight){
//         navbar.classList.add('fixed-nav')
//     }else{
//         navbar.classList.remove('fixed-nav')
//     }

//     if (scrollHeight > 500){
//         topLink.classList.add("show-link");
//     } else {
//       topLink.classList.remove("show-link");
//     }
// })

// window.addEventListener('scroll', () => {
// 	const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
	
// 	// console.log( { scrollTop, scrollHeight, clientHeight });
	
// 	if(clientHeight + scrollTop >= scrollHeight - 5) {
// 		showLoading();
// 		console.log('hello')
// 	}
// })

// function showLoading() {
// 	loading.classList.add('show');
// 	setTimeout(getBookData, 1000);
// }
const renderSpinner=function(){
	const markup=`
	<div class="spinner">
		   <i class="fa-solid fa-spinner"></i>
	</div>
	`
	//resultsList.insertAdjacentHTML("afterbegin",markup)
	resultsList.innerHTML=markup;
 }
//  window.addEventListener("load",renderSpinner)

const getBookData = async function() {
	const titleResponse = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchInput.value}`);
	const titleData = await titleResponse.json();
    const { items } = titleData;
    console.log(items)
	
	// const userResponse = await fetch('https://randomuser.me/api');
	// const userData = await userResponse.json();
	
	// const data = { post: postData, user: userData.results[0] };
	
	addDataToDOM(items);
}

getBookData(searchInput.value='harry potter');

searchForm.addEventListener('submit',function(e){
	e.preventDefault()
	if(searchInput.value){
		renderSpinner();
		getBookData();
	}
})

// function getRandomNr() {
// 	return Math.floor(Math.random() * 100) + 1;
// }
const placeHldr = 'https://images.unsplash.com/photo-1622569381449-8ed923b515ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODV8fGhhcnJ5JTIwcG90dGVyJTIwYm9vayUyMGNvdmVyJTIwcGFnZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60';

const addDataToDOM = function(items) {
	//let markup='';
    if(items){
        const getBooks=items.map(item => {
		const { volumeInfo } = item;
		// console.log(volumeInfo);
		return {
			title: volumeInfo.title,
			author: volumeInfo.authors[0],
			publisher: volumeInfo.publisher,
			bookLink: volumeInfo.previewLink,
			bookIsbn: item.volumeInfo.industryIdentifiers[0].identifier,
			bookImg: (volumeInfo.imageLinks) ? volumeInfo.imageLinks.thumbnail : placeHldr
		}
       });
	   console.log(getBooks);
	   renderBooks(getBooks)
    }
}

const renderBooks = function(data){
	console.log(data)
	let markup='';
	if(data){
		data.forEach(element => {
			const { bookImg, title, author, publisher, bookLink } = element;
            markup +=`
			<div class="preview">
				<figure><img src="${bookImg}" alt="Test" /></figure>
				<div class="details">
					<h4 class="preview__title">${title}
					</h4>
	
					<h5 class="preview__author">Author:
						<span>${author}</span>
					</h5>
	
					<h6 class="preview__publisher">Publisher:<span>${publisher}</span>
					</h6>
	
					<a target="_blank" class="book--read" href='${bookLink}'>read book</a>  
				</div>
			</div>
		    `
	   });
	}
	else{
		markup=`
		<div class="error">
			<p>No books found for your query. Please try again!</p>
		</div>
		`
	}
	// loading.classList.remove('show');
	resultsList.innerHTML=markup;
	searchInput.value='';
	// const readBtn = resultsList.querySelector('.book--read');
	// readBtn.addEventListener('click',function(e){
	// 	const target = e.target;
	// 	console.log(target)
	// })
	//bookView()
	
}