import React, {Component} from 'react'
import axios from 'axios'
class App extends Component {
    state ={
        isLoading:true,
        repoName:'',
        repoUrl:'',
        errMsg:''
    }
    keyword = 'v'

    async componentDidMount() {
        const url = `https://api.github.com/search/repositories?q=${this.keyword}&sort=stars`
        try {
            let response = await axios.get(url)
            let repoInfo =  response.data.items[0];
            this.setState({
                isLoading:false,
                repoName:repoInfo.name,
                repoUrl:repoInfo.html_url,
                errMsg:''
            })
        }
        catch (err) {
            // console.log(err ,typeof err);// err 是 object类型的 ，但是 react在底层有单独给err写了一个toString方法，
            // state中 errMsg的数据类型最好不要直接写对象，因为不方便输出到页面，所以可以使用toString方法转换成 字符串再输出
            this.setState({
                isLoading:false,
                repoName:'',
                repoUrl:'',
                errMsg:err.toString()
            })

        }
    }

    render() {
        let {repoName, repoUrl,errMsg, isLoading } = this.state
        if(isLoading){
            return <h3> Loading</h3>
        }else if(errMsg){
              return <h3> {errMsg} </h3>
        }else {
            return <h3>github 上包含【{this.keyword}】 关键字的所有仓库中，点赞数量最多的是 <a href={repoUrl}>{repoName}</a></h3>/**/
        }
    }
}

export default App