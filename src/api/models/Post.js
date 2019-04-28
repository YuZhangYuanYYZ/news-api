 class Post {
     constructor({
         title,
         excerpt,
         author
     }) {
         this.title = title;
         this.author = author;
         this.excerpt = excerpt;
     }
 }

 module.exports = Post;