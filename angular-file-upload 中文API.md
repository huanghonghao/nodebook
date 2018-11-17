```javascript
Directives（指令）
nv-file-drop
<!-- 最少配置 -->
<elementnv-file-dropuploader="{FileUploader}"></element>
<!-- 最多配置 -->
<elementnv-file-dropuploader="{FileUploader}"options="{Object}"filters="{String}"></element>
属性 uploader 必须是 FileUploader的一个实例。
属性 options 可能是 {FileItem} 的设置或者自定义设置。
属性 filters 可能是用,隔开的过滤器名称，比如： 'filterName1, filterName2'，这些过滤器必须如下预定义：
uploader.filters.push({name:'filterName1', fn:function() {/* your code here */}});
uploader.filters.push({name:'filterName2', fn:function() {/* your code here */}});
nv-file-select
<!-- 最少配置 -->
<inputtype="file"nv-file-selectuploader="{FileUploader}"/>
<!-- 最多配置 -->
<inputtype="file"nv-file-selectuploader="{FileUploader}"options="{Object}"filters="{String}"/>
nv-file-over
<!-- 最少配置 -->
<elementnv-file-overuploader="{FileUploader}"></element>
<!-- 最多配置 -->
<elementnv-file-overuploader="{FileUploader}"over-class="{String}"></element>
Service（服务）
FileUploader
FileUploader
属性
url {String}: 上传文件的服务器路径
alias {String}:  包含文件的名称，默认是file
queue {Array}: 上传队列
progress {Number}: 上传队列的进度，只读
headers {Object}: 上传的头文件信息， 浏览器需支持HTML5
formData {Array}: 与文件一起发送的表单数据
filters {Array}: 在文件加入上传队列之前应用过滤器.，如果过滤器返回true则文件加入队列中
autoUpload {Boolean}: 文件加入队列之后自动上传，默认是false
method {String}: 请求方式，默认是POST，浏览器需支持HTML5
removeAfterUpload {Boolean}: 文件上传成功之后从队列移除，默认是false
isHTML5 {Boolean}: 如果浏览器支持HTML5上传则返回true，只读
isUploading {Boolean}: 文件正在上传中返回true，只读
queueLimit {Number} : 最大上传文件数量（预定义）
withCredentials {Boolean} : 使用CORS，默认是false， 浏览器需支持HTML5
方法
addToQueue function(files[, options[, filters]]) {: Add items to the queue, where files is a {FileList|File|HTMLInputElement}, options is an {Object} andfilters is a {String}.  添加项到上传队列中，files 是 {FileList|File|HTMLInputElement}， options 是 {Object} 以及 filters 是 {String}
removeFromQueue function(value) {: Remove an item from the queue, wherevalue is {FileItem} or index of item.  从上传队列移除项，value 可以是 {FileItem} 或者项的序号
clearQueue function() {: Removes all elements from the queue.  移除上传队列所有的元素
uploadItem function(value) {: Uploads an item, where value is {FileItem} or index of item.  上传项， value 可以是 {FileItem} 或者项的序号
cancelItem function(value) {: Cancels uploading of item, where value is{FileItem} or index of item.  取消上传的项
uploadAll function() {: Upload all pending items on the queue.  将上传队列中所有的项进行上传
cancelAll function() {: Cancels all current uploads.  取消所有当前上传
destroy function() {: Destroys a uploader. 
isFile function(value) {return {Boolean};}: Returns true if value is {File}. 
isFileLikeObject function(value) {return {Boolean};}: Returns true if value is{FileLikeObject}.
getIndexOfItem function({FileItem}) {return {Number};}: Returns the index of the{FileItem} queue element.  返回项在上传队列中的序号
getReadyItems function() {return {Array.<FileItems>};}: Return items are ready to upload.  返回准备上传的项
getNotUploadedItems function() {return {Array.<FileItems>};}: Return an array of all pending items on the queue  返回上传队列中未上传的项
回调函数
onAfterAddingFile function(item) {: 添加文件到上传队列后
onWhenAddingFileFailed function(item, filter, options) {: 添加文件到上传队列失败后
onAfterAddingAll function(addedItems) {: 添加所选的所有文件到上传队列后
onBeforeUploadItem function(item) {: 文件上传之前
onProgressItem function(item, progress) {: 文件上传中
onSuccessItem function(item, response, status, headers) {: 文件上传成功后
onErrorItem function(item, response, status, headers) {: 文件上传失败后
onCancelItem function(item, response, status, headers) { - 文件上传取消后
onCompleteItem function(item, response, status, headers) {: 文件上传完成后
onProgressAll function(progress) {: 上传队列的所有文件上传中
onCompleteAll function() {: 上传队列的所有文件上传完成后

成功上传文件的回调函数顺序是：onAfterAddingFile — onAfterAddingAll — onBeforeUploadItem — onProgressItem — onProgressAll — onSuccessItem — onCompleteItem — onCompleteAll
FileItem
属性
url {String}: Path on the server in which this file will be uploaded  上传文件的服务器路径
alias {String}: Name of the field which will contain the file, default is file  包含文件的名称，默认是file
headers {Object}: Headers to be sent along with this file. HTML5 browsers only.  上传的头文件信息， 浏览器需支持HTML5
formData {Array}: Data to be sent along with this file  与文件一起发送的表单数据
method {String}: It's a request method. By default POST. HTML5 browsers only.  请求方式，默认是POST，浏览器需支持HTML5
withCredentials {Boolean} : enable CORS. HTML5 browsers only.  使用CORS，默认是false， 浏览器需支持HTML5
removeAfterUpload {Boolean}: Remove this file from the queue after uploading  上传之后从上传队列移除该文件
index {Number} - A sequence number upload. Read only.  上传文件在上传队列中的序号，只读
progress {Number}: File upload progress percentage. Read only.  文件上传的进度，只读
isReady {Boolean} - File is ready to upload. Read only.  文件是否准备好上传，只读
isUploading {Boolean}: true if the file is being uploaded. Read only.  文件是否正在上传中，只读
isUploaded {Boolean}: true if the file was uploaded. Read only.  文件是否已经上传，只读
isSuccess {Boolean}: true if the file was uploaded successfully. Read only.  文件是否已经上传成功，只读
isCancel {Boolean} : true if uploading was canceled. Read only.  文件是否取消上传，只读
isError {Boolean} - true if occurred error while file uploading. Read only.  文件是否上传错误，只读
uploader {Object}: Reference to the parent Uploader object for this file. Read only.  上传该文件的Uploader ，只读
方法
remove function() {: Remove this file from the queue  从上传队列移除该文件
upload function() {: Upload this file  上传该文件
cancel function() {: Cancels uploading of this file  取消上传该文件
回调函数
onBeforeUpload function() {: Fires before uploading an item.  上传该文件之前
onProgress function(progress) {: On file upload progress.  上传该文件的过程
onSuccess function(response, status, headers) {: On file successfully uploaded  成功上传该文件后
onError function(response, status, headers) {: On upload error  上传该文件出错后
onCancel function(response, status, headers) { - On cancel uploading  取消上传该文件后
onComplete function(response, status, headers) {: On file upload complete (independently of the sucess of the operation)  完成上传该文件后
Filters（过滤器）
注册过滤器：
var uploader =newFileUploader({
    filters: [{
        name:'yourName1',
        // A user-defined filterfn:function(item) {
            returntrue;
        }
    }]
});

// 另一种
uploader.filters.push({
    name:'yourName2',
    fn:function(item) {
        returntrue;
    }
});
预定义的过滤器：
folder
queueLimit

github地址： https://github.com/nervgh/angular-file-upload/wiki/Module-API
```

