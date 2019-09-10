import React, {Component} from 'react'
import Search from './components/search'
import List from  './components/list'
class App extends Component {
    state ={
        isFirst:true,
        isLoading:false,
        users:[],
        errMsg:''
    }
    render() {
        return (
            <div className="container">
                <Search/>
                <List/>
            </div>
        )
    }
}

export default App