import axios from 'axios'
import { LoadingBar } from 'iview';
import qs from 'qs'

const isDev = process.env.NODE_ENV === 'development'

const ajax = axios.create({
    baseURL: isDev ? "http://127.0.0.1:8000" : "http://127.0.0.1:8000"
})


// 拦截器
ajax.interceptors.request.use((config) => {
    LoadingBar.start();
    return config
})

ajax.interceptors.response.use((resp) => {
    if (resp.status === 200) {
        LoadingBar.finish();
        return resp.data
    }
})

// 用户登录
export const userLogin = (username, password, headers) => {
    return ajax({
        url: '/api/userLogin',
        method: 'post',
        responseType: 'json',
        data: qs.stringify({ 'username': username, 'password': password }),
        headers: {
            'X-CSRFToken': headers
        }
    })
}


// 用户注册
export const userRegister = (email, username, password, headers) => {
    return ajax({
        url: '/api/userRegister',
        method: 'post',
        responseType: 'json',
        data: qs.stringify({ 'email': email, 'username': username, 'password': password }),
        headers: {
            'X-CSRFToken': headers
        }
    })
}


// 发布博客
export const addBlog = (title, author, content, category, tag, headers) => {
    return ajax({
        url: '/api/addBlog',
        method: 'post',
        responseType: 'json',
        data: qs.stringify({ 'title': title, 'author': author, 'content': content, 'category': category, 'tag': tag }),
        headers: {
            'X-CSRFToken': headers
        }
    })
}

// 博客列表
export const listOfBlog = () => {
    return ajax({
        url: '/api/listOfBlog',
        method: 'get',
        responseType: 'json'
    })
}

export const list = () => {
    return ajax({
        url: "/list/",
        method: "get",
        responseType: 'json'
    })
}
export const weather = () => {
    return ajax({
        url: "http://wthrcdn.etouch.cn/weather_mini?city=" + this.city + "&" + "key=" + this.key,
        method: "get",
        responseType: 'json'
    })
}

// 博客详情（get）
export const getBlogDetails = (id) => {
    return ajax.get(`/api/blog/${id}`)
}

// （post）
export const postBlogDetails = (id, name, content, headers) => {
    return ajax({
        url: '/api/commentOfBlog',
        method: 'post',
        responseType: 'json',
        data: qs.stringify({ 'id': id, 'name': name, 'content': content }),
        headers: {
            'X-CSRFToken': headers
        }
    })
}

// 个人博客
export const selfBlogList = (author, headers) => {
    return ajax({
        url: '/api/selfOfBlog',
        method: 'post',
        responseType: 'json',
        data: qs.stringify({ 'author': author }),
        headers: {
            'X-CSRFToken': headers
        }
    })
}




// 删除博客
export const delBlog = (id, headers) => {
    return ajax({
        url: '/api/delOfBlog',
        method: 'post',
        responseType: 'json',
        data: qs.stringify({ 'blog_id': id }),
        headers: {
            'X-CSRFToken': headers
        }
    })
}

// 个人中心
export const centerManage = (author, headers) => {
    return ajax({
        url: '/api/centerManage',
        method: 'post',
        responseType: 'json',
        data: qs.stringify({ 'author': author }),
        headers: {
            'X-CSRFToken': headers
        }
    })
}


// 上传头像
export const changeAvatar = () => {
    return ajax({
        url: '/api/uploadAvatar',
        responseType: 'json'
    })
}


// 编辑（get）
export const getBlogEdit = (id) => {
    return ajax.get(`/api/edit/${id}`)
}

// 编辑后保存
export const postSaveBlog = (id, title, content, headers) => {
    return ajax({
        url: '/api/blogSave',
        method: 'post',
        responseType: 'json',
        data: qs.stringify({ 'id': id, 'title': title, 'content': content }),
        headers: {
            'X-CSRFToken': headers
        }
    })
}

// 分类标签
export const getCategory = () => {
    return ajax({
        url: "/api/allCategory",
        method: "get"
    })
}

// 选中标签

export const getChooseCategory = (cate, headers) => {
    return ajax({
        url: "/api/getChooseCategory",
        method: "post",
        responseType: "json",
        data: qs.stringify({ 'cate': cate }),
        headers: {
            'X-CSRFToken': headers
        }
    })
}