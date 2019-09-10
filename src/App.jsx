import React, {Component} from 'react'

class App extends Component {
    state ={
        isLoading:true,
        repoName:'',
        repoUrl:'',
        errMsg:''
    }
    keyword = 'w'

    async componentDidMount() {
        const url = `https://api.github.com/search/repositories?q=${this.keyword}&sort=stars`

        fetch(url)
            .then((result)=>{
                console.log(result);

                // 坑1：如果域名对了但是路由错了仍然会打印成功，但是获取不到数据
                // return  result.json()  //使用 json方法可以生成一个promise对象，使后面的点then可以继续点下去.同时也会自动帮助管理状态


                // 手动判断，如果接口正确就进行下一步，如果路由错了就直接返回一个Promise对象并携带错误信息
                if(result.ok){
                    return result.json()
                }else{
                    return Promise.reject('请求资源不存在')
                }
            })
            .then((data)=>{
                console.log('成功了');
                let repoInfo = data.items[0]
                this.setState({
                    isLoading:false,
                    repoName:repoInfo.name,
                    repoUrl:repoInfo.html_url,
                    errMsg:''
                })

            })
            .catch((err)=>{
                console.log('失败了');
                this.setState({
                    isLoading:false,
                    repoName:'',
                    repoUrl:'',
                    errMsg:err.toString()
                })
            })
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