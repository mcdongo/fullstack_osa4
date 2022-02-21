const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let total = 0

    blogs.map(blog => {
        total += blog.likes
    })
    return total
}

const favoriteBlog = (blogs) => {
    let mostLikedBlog = blogs.reduce((max, obj) => (max.likes > obj.likes) ? max : obj)
    return mostLikedBlog
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}