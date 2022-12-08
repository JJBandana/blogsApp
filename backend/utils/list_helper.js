const dummy = () => 1

const totalLikes = blogs => blogs.reduce((acc, curr) => acc + curr.likes, 0)

const favoriteBlog = blogs => blogs.find(blog => blog.likes === Math.max(...blogs.map(blog => blog.likes)));

const mostBlogs = blogs => {
  const authors = blogs.reduce((acc, value) => {
  if(!acc[value.author]){
    acc[value.author] = 1
  } else {
    acc[value.author]++
  }
  return acc
}, {})
let sortable = []

for (let i in authors) sortable.push([i, authors[i]])
  
  sortable.sort((a,b)=> b[1]-a[1])

  return {author: sortable[0][0], blogs: sortable[0][1]}
}

const mostLikes = blogs => {

	const authors = blogs.reduce((accumulator, current)=>{

  if(!accumulator[current.author]){
    accumulator[current.author] = current.likes
  } else {
    accumulator[current.author] += current.likes
  }
  return accumulator
  },{})
  
  let sortable = []
  
  for (let i in authors) sortable.push([i, authors[i]])
  
  sortable.sort((a,b)=> b[1]-a[1])

  return { author: sortable[0][0], likes: sortable[0][1]}
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }