var app = new Vue({
  el: '#app',
  data: {
    link_in: '',
    text_in: '',
    link_out: '',
    text_out: '',
    search: '',
    url_img: 'https://image.tmdb.org/t/p/w640/',
    lists: [],
    lists_music: [],
    trackPreview: '',
    audioObject: new Audio(),
    page: 1,
    disableButton: false,
    userValid:false
  },
  methods: {
    logout: function () {
      localStorage.clear()
      window.location.href = 'http://127.0.0.1:8080/signin.html'
    },
    getToken: function () {
      console.log('ini gettoken '+this.userValid);
      console.log('asdasdasd');
      if(this.userValid===false){

          this.text_in = 'Signin'
          this.link_in = '/signin.html'
          this.text_out = 'Signup'
          this.link_out = '/signup.html'
          this.disableButton = true
        }else {
          this.text_in = 'Welcome'
          this.link_in = '#'
          this.text_out = 'Logout'
          this.link_out = 'logout.html'
          this.disableButton = false
        }

    },
    getData: function () {
      axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=1ad666ec91a4fdd4791ec175eee11d5a&language=en-US&page=${this.page}`, {
        title: this.title
      })
        .then(function (response) {
          // console.log(response.data)
          app.lists = response.data.results
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    pageNext: function () {
      this.lists_music = [];
      this.page++
      this.getData()
    },
    pagePrev: function () {
      this.lists_music = [];
      this.page--
      if (this.page < 1) {
        this.page = 1
      }
      this.getData()
    },
    clickSearch: function () {
      this.lists_music = [];
      axios.get(`http://localhost:3000/film/${this.search}`)
        .then(function (response) {
          app.lists = response.data.results
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    trackClick: function (hasil) {
      console.log(hasil) // PROSES AMBIL MUSIC ROCK AND ROLL
      this.lists = [hasil]
      axios.get(`https://api.spotify.com/v1/search`, {
        params: {
          q: hasil.title,
          type: 'album'
        }
      })
        .then(function (response) {
          app.lists_music = response.data.albums.items
          console.log(app.lists_music)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    fetchTracks: function (albumId) {
      axios.get(`https://api.spotify.com/v1/albums/${albumId}`)
        .then(function (response) {
          app.playTracks(response.data.tracks.items[0].preview_url)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    playTracks: function(track){
      console.log(this.checkAudio(this.audioObject));
      if (this.trackPreview===track) {

        if(this.checkAudio(this.audioObject)){
          this.audioObject.pause();
        }else{

          this.audioObject.play();
        }
      }else{
        this.audioObject.pause();
        this.trackPreview=track
        this.audioObject = new Audio(this.trackPreview);
        this.audioObject.play();
      }

    },
    checkAudio: function(audElem){
      return !audElem.paused;
    },
    tokenValidation: function(){
      var tokenValue = localStorage.getItem('token')
      axios.post('http://localhost:3000/users/validate', {
        token:tokenValue
      }).then(function(response){
        if (response.data==='valid') {
          console.log('ini benar');
          app.userValid=true
          app.getToken()
        }else{
          console.log('ini salah');
          app.userValid=false
          console.log(this.userValid);
          app.getToken()
        }

      }).catch(function(response){
      })
    }
  },
  created: function () {
    this.tokenValidation()
    this.getData()
  }
})
