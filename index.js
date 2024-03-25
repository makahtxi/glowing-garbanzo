import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))

//Posts
var posts = []
function Post(title, text){
    this.title = title;
    this.body = text;
}



app.get("/", (req, res) =>{
    res.render("index.ejs");
})

app.get("/new", (req, res)=>{
    res.render("new.ejs");
})

app.post("/submit", (req, res)=>{
    var newPost = new Post(req.body.title, req.body.text)
    posts.push(newPost)
    res.locals.posts = posts
    res.render("index.ejs");
})

app.post("/startEdit", (req, res) =>{
    console.log(req.body.postId)
    var postToEdit = req.body.postId
    res.locals.posts = posts
    res.render("edit.ejs", {
        postToEdit: postToEdit
    })
    
});


app.post("/edit", (req, res) =>{
    var id = req.body.postId
    posts[id].body=req.body.text
    posts[id].title=req.body.title
    res.locals.posts = posts
    res.render("index.ejs");
})


app.post('/delete', (req, res) => {
    console.log(req.body)
    var postToDelete = req.body.postId
    posts.splice(postToDelete, 1)
    res.locals.posts = posts
    res.render('index.ejs');
  });

app.listen(3000, ()=>{
    console.log(`Listening on ${port}`);
})