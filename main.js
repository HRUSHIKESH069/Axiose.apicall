
// axios is network calling tool.
// we can do API call with thwe help of axios .

// AXIOS GLOBALS

axios.defaults.headers.common['x-Auth-Token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

// GET REQUEST
function getTodos(){
   axios({
       method : 'get',
       url: 'https://jsonplaceholder.typicode.com/todos',
        params: {
           _Limit: 5
       }
    })
    .then(res => console.log(res.data))
    .catch(err => console.error(err));
}

// OR 

// axios
//  .get('https://jsonplaceholder.typicode.com/todos?_Limit=5',{
    
//  timeout: 5000

// })

 //.then(res => showOutput(res))
 //.catch(err => console.error(err));

 // POST REQUEST

 function addTodos(){
    axios
    .post('https://jsonplaceholder.typicode.com/todos', {
        title: 'New Todo',
        completed: false
    })
    .then(res => showOutput(res))
    .catch(err => console.error(err));
 }

 // PUT/PATCH REQUEST

 function updateTodos(){
    axios
    .put('https://jsonplaceholder.typicode.com/todos/1', {
        title: 'Updated Todo',
        completed: true
    })
    .then(res => showOutput(res.data))
    .catch(err => console.error(err));
 }

 // DELETE REQUEST

 function removeTodos() {
    axios 
    .delete('https://jsonplaceholder.typicode.com/todos/1')
    .then(res => showOutput(res))
    .catch(err => console.error(err));
 }

 // SIMULTANEOUS DATA

 function getDate() {
    axios
    .all([
        axios.get('https://jsonplaceholder.typicode.com/todos?_limit5'),
        axios.get('https://jsonplaceholder.typicode.com/posts?_limit5')
    ])
    //.then(res => {
      //  console.log(res[0]);
       // console.log(res[1]);
       // showOutput(res[1]);
    //})
    .then(axios.spread((Todos, posts) => showOutput(posts)))
    .catch(err => console.error(err));
 }

// CUSTOM HEADER

function customHeaders(){
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'sometoken'
        }
    };

    axios
    .post('https://jsonplaceholder.typicode.com/todos', 
    {
        title: `New Todo`,
        completed: false
    },
    config
    )
    .then(res => showOutput(res))
    .catch(err => console.error(err));
}

// CANCEL TOKEN

function cancelToken(){
    const source = axios.CancelToken.source();

    axios
    .get('https://jsonplaceholder.typicode.com/todos', {
        cancelToken: source.token
    })
    .then(res => showOutput(res))
    .catch(thrown => {
        if(axios.isCancel(thrown)){
            console.log('Request canceled',thrown.message);
        }
    });

    if (true){
        source.cancel('Rquest cancel!')
    }
}

// ERROR HANDLING

function errorHandling(){
    axios
    .get(`https://jsonplaceholder.typicode.com/todos`,{
        //ValiditeStatus: function(status) {
          //  return status< 500;
        //}
    })
    .then(res => showOutput(res))
    .catch(err =>{
        if (err.response) {

            console.log(err.response.date);
            console.log(err.response.status);
            console.log(err.response.headers);

            if(err.response.status === 404) {
                alert(`Error: Page Not Found`);
            }
        } else if(err.request) {
            console.error(err.request);
        } else {
            console.error(err.massage);
        }
    });
}

//AXIOS INSTANCE

const  axiosInstance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
});

 axiosInstance.get('/comments').then(res=>showOutput(res));

 // INTERCEPTING REQUESTS AND RESPONSES

 axios.interceptors.request.use(
    config => {
        console.log(
            `${config.method.toUpperCase()} request sent to ${config.url} at ${new Date().getTime()}`
        );
 
    return config;
 },
 error => {
    return Promise.reject(error);
 }
);

// Show output in browser

function showOutput(res) {
    document.getElementById('res').innerHTML = `

    <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
    </div>

    <div class="card mt-3">
    <div class="card-header">
    Headers
    </div>
    <div class="card-body">
    <pre> ${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
    </div>

    <div class="card mt=3">
    <div class="card-header">
    Data
    </div>
    <div class="card-body">
    <pre> ${JSON.stringify(res.data, null, 2)}</pre>
    </div>
    </div>
    <div class="card mt-3">
    <div class="card-Header">
    config
    </div>
    <div class="card-body">
    <pre>${JSON.stringify(res.config,null,2)}</pre>
    </div>
    </div>
`;
}

// Event Listener
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodos);
document.getElementById('update').addEventListener('click',updateTodos);
document.getElementById('delete').addEventListener('click',removeTodos);
document.getElementById('sim').addEventListener('click',getDate);
document.getElementById('headers').addEventListener('click',customHeaders);
//document.getElementById('transform').addEventListener('click',transformResponse);
document.getElementById('error').addEventListener('click',errorHandling);
document.getElementById('cancel').addEventListener('click',cancelToken);

