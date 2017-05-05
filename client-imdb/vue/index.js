var app = new Vue({
  el: '#app',
  data: {
    link_in : "",
    text_in : "",
    link_out : "",
    text_out : "",
    search : "",
    url_img :"https://image.tmdb.org/t/p/w640/",
    lists : [],
    page : 1
  },
  methods : {
    logout : function(){
      localStorage.clear()
      window.location.href = 'http://127.0.0.1:8080/signin.html'
    },
    getToken : function(){
    var getToken = localStorage.getItem("token");
      if(getToken == null){
        this.text_in = "Signin";
        this.link_in = "/signin.html";
        this.text_out = "Signup";
        this.link_out = "/signup.html";
      }else{
        this.text_in = "Welcome";
        this.link_in = "#";
        this.text_out = "Logout";
        this.link_out = "logout.html";

      }
    },
    getData : function(){
      axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=1ad666ec91a4fdd4791ec175eee11d5a&language=en-US&page=${this.page}`,{
        title : this.title
      })
      .then(function (response) {
        // console.log(response.data)
        app.lists = response.data.results
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    pageNext : function(){
      this.page++
      this.getData()
    },
    pagePrev : function(){
      this.page--
      if(this.page < 1){
        this.page = 1
      }
      this.getData()
    },
    clickSearch : function(){
      axios.get(`http://localhost:3000/film/${this.search}`)
      .then(function(response){
        app.lists = response.data.results
      })
      .catch(function(error){
        console.log(error)
      })
    },
    trackClick : function(){
      axios.get(`http://localhost:3000/film/${this.search}`)
      .then(function(response){
        app.lists = response.data.results
      })
      .catch(function(error){
        console.log(error)
      })
    }
  },
  created : function(){
    this.getToken();
    this.getData();
  }
})