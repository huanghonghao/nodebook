[TOC]

# OAuth2.0 与 Spring Security OAuth2.0 的使用

### 1. 什么是OAuth2.0

OAuth 2.0是行业标准的授权协议。OAuth 2.0取代了2006年创建的原始OAuth协议所做的工作.OAuth 2.0专注于客户端开发人员的简单性，同时为Web应用程序，桌面应用程序，移动电话和客厅设备提供特定的授权流程。该规范及其扩展正在[IETF OAuth工作组](https://www.ietf.org/mailman/listinfo/oauth)内开发。

OAuth2.0（开放授权）是一个关于授权的开放的网络协议。
　　允许用户让第三方应用访问该用户在某一网站上存储的的资源（如：照片，视频，联系人列表），而无需将用户名和密码提供给第三方应用。
　　OAuth是一个关于授权（Authorization）的开放网络标准，目前的版本是2.0版。注意是Authorization(授权)，而不是Authentication(认证)。用来做Authentication(认证)的标准叫openid connect。

### 2. 背景

最传统的办法是让用户直接在简书的登录页面输微博的账号和密码，简书通过用户的账号和密码去微博那里获取用户数据，但这样做有很多严重的缺点：

- 简书需要明文保存用户的微博账号和密码，这样很不安全。

- 简书拥有了获取用户在微博所有的权限，包括删除好友、给好友发私信、更改密码、注销账号等危险操作。

- 用户只有修改密码，才能收回赋予简书的权限。但是这样做会使得其他所有获得用户授权的第三方应用程序全部失效。

- 只要有一个第三方应用程序被破解，就会导致用户密码泄漏，以及所有使用微博登录的网站的数据泄漏。

### 3. 基本原理

 OAuth在第三方应用与服务提供商之间设置了一个授权层。第三方应用不能直接登录服务提供商，只能登录授权层，以此将用户与客户端区分开来。第三方应用登录授权层所用的令牌，与用户的密码不同。用户可以在登录授权的时候，指定授权层令牌的权限范围和有效期。 

### 4. 角色

* **resource owner**：资源所有者（指用户）

* **resource server**：资源服务器存放受保护资源，要访问这些资源，需要获得访问令牌

* **client**：客户端代表请求资源服务器资源的第三方程序，客户端同时也可能是一个资源服务器

* **authrization server**：授权服务器用于发放访问令牌给客户端

### 5. 授权模式

#### 5.1 授权码模式（authorization code）

授权码模式是功能最完整、流程最严密的授权模式，它的特点是通过客户端的后台服务器，与“服务器提供”的认证服务器进行互动，所以资源所有者的凭据永远不会与客户机共享。

![img](..\874963-20180613092914212-535019688.png)

1. (A)  客户端通过将资源所有者的用户代理指向授权端点来启动这个流程。客户端包含它的客户端标识符，请求范围，本地状态，和重定向URI，在访问被允许（或者拒绝）后授权服务器立即将用户代理返回给重定向URI。

2. (B)  授权服务器验证资源所有者（通过用户代理），并确定资源所有者是否授予或拒绝客户端的访问请求。
3. (C)  假设资源所有者授权访问，那么授权服务器用之前提供的重定向URI（在请求中或在客户端时提供的）将用户代理重定向回客户端。重定向URI包括授权码和前面客户端提供的任意本地状态。
4. (D)  客户端用上一步接收到的授权码从授权服务器的令牌端点那里请求获取一个访问令牌。
5. (E)  授权服务器对客户端进行认证，校验授权码，并确保这个重定向URI和第三步(C)中那个URI匹配。如果校验通过，则发放访问令牌，以及可选的刷新令牌。

![授权码模式](C:\Users\suoju\Downloads\授权码模式.svg)

**Authorization Request**   客户端通过使用“application/x-www-form- urlencoding”格式向授权端点URI的查询组件添加以下参数来构造请求URI

`response_type`：必须的。值必须是"code"。
`client_id`： 必须的。客户端标识符。
`redirect_uri`： 可选的。
`scope`： 可选的。请求访问的范围。
`state`： 推荐的。一个不透明的值用于维护请求和回调之间的状态。授权服务器在将用户代理重定向会客户端的时候会带上该参数。

```
GET /authorize?response_type=code&client_id=s6BhdRkqt3&state=xyz&redirect_uri=https%3A%2F%2Fclient%2Eexample%2Ecom%2Fcb HTTP/1.1
Host: server.example.com
```
**授权请求 Authorization Response**   如果资源所有者授权访问请求，授权服务器发出授权代码并通过使用“application/x-www-form- urlencoding”格式向重定向URI的查询组件添加以下参数，将其给客户端。

- code：必须的。授权服务器生成的授权码。授权代码必须在发布后不久过期，以减少泄漏的风险。建议最大授权代码生命期为10分钟。客户端不得多次使用授权代码。如果授权代码不止一次使用，授权服务器必须拒绝请求，并在可能的情况下撤销先前基于该授权代码发布的所有令牌。授权代码是绑定到客户端标识符和重定向URI上的。
- state：如果之前客户端授权请求中带的有"state"参数，则响应的时候也会带上该参数。

**例如：**

```
HTTP/1.1 302 Found
Location: https://client.example.com/cb?code=SplxlOBeZQQYbYS6WxSbIA&state=xyz
```

**令牌请求 Access Token Request**  客户端通过使用“application/ www-form-urlencoding”格式发送以下参数向令牌端点发出请求

- grant_type：必须的。值必须是"authorization_code"。
- code：必须的。值是从授权服务器那里接收的授权码。
- redirect_uri：如果在授权请求的时候包含"redirect_uri"参数，那么这里也需要包含"redirect_uri"参数。而且，这两处的"redirect_uri"必须完全相同。
- client_id：如果客户端不需要认证，那么必须带的该参数。

**例如：**

```
POST /token HTTP/1.1
Host: server.example.com
Authorization: Basic czZCaGRSa3F0MzpnWDFmQmF0M2JW
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code&code=SplxlOBeZQQYbYS6WxSbIA&redirect_uri=https%3A%2F%2Fclient%2Eexample%2Ecom%2Fcb
```

**Access Token Response**

**例如：**

```
HTTP/1.1 200 OK
　　Content-Type: application/json;charset=UTF-8
　　Cache-Control: no-store
　　Pragma: no-cache

　　{
　　　　"access_token":"2YotnFZFEjr1zCsicMWpAA",
　　　　"token_type":"example",
　　　　"expires_in":3600,
　　　　"refresh_token":"tGzv3JOkF0XG5Qx2TlKWIA",
　　　　"example_parameter":"example_value"
　　}
```



#### 5.2 简单模式（Implicit）

简化模式不通过第三方应用程序的服务器，直接在浏览器中向认证服务器申请令牌，跳过了“授权码”这个步骤

![img](https://images2018.cnblogs.com/blog/874963/201806/874963-20180613130551483-1764035879.png)

隐式授权流程如图所示：

1. (A)  客户端引导资源所有者的user-agent到授权端点。客户端携带它的客户端标识，请求scope，本地state和一个重定向URI。
2. (B)  授权服务器对资源所有者（通过user-agent）进行身份认证，并建立连接是否资源所有者允许或拒绝客户端的访问请求。
3. (C)  假设资源所有者允许访问，那么授权服务器通过重定向URI将user-agent返回客户端。
4. (D)  user-agent遵从重定向指令
5. (E)  web-hosted客户端资源返回一个web页面（典型的，内嵌脚本的HTML文档），并从片段中提取访问令牌。
6. (F)  user-agent执行web-hosted客户端提供的脚本，提取访问令牌
7. (G)  user-agent将访问令牌传给客户端

**Authorization Request**

`response_type`：必须的。值必须是"token"。
`client_id`：必须的。
`redirect_uri`：可选的。
`scope`：可选的。



#### 5.3 密码模式（password）

密码模式中，用户向客户端提供自己的用户名和密码，客户端使用这些信息向“服务提供商”索要授权

![img](https://images2018.cnblogs.com/blog/874963/201806/874963-20180613123757202-1093486879.png)

1. (A)  资源所有者提供他的用户名和密码给客户端

2. (B)  客户端携带从资源所有者那里收到的凭证去授权服务器的令牌端点那里请求获取访问令牌

3. (C)  授权服务器对客户端进行身份认证，并校验资源所有者的凭证，如果都校验通过，则发放访问令牌

**Access Token Request**

  `grant_type` ：必须的。而且值必须是"password"。
  `username` ：必须的。资源所有者的用户名。
  `password` ：必须的。资源所有者的密码。
  `scope` ：可选的。



#### 5.4 客户端模式

客户端用它自己的客户单凭证去请求获取访问令牌

![img](https://images2018.cnblogs.com/blog/874963/201806/874963-20180613132731411-243294503.png)

客户端凭证授权流程如图所示：

1. (A)  客户端用授权服务器的认证，并请求获取访问令牌
2. (B)  授权服务器验证客户端身份，如果严重通过，则发放令牌

**Access Token Request**

`grant_type`：必须的。值必须是"client_credentials"。
`scope`：可选的。



### 6. 涉及的类

***AuthorizationServerConfigurerAdapter***

- 通过继承该类并重写 configure 方法来配置授权服务器： 
  - configure(AuthorizationServerEndpointsConfigurer endpoints)：配置授权服务器端点，如令牌存储，令牌自定义，用户批准和授权类型，不包括端点安全配置
  - configure(AuthorizationServerSecurityConfigurer oauthServer)：配置授权服务器端点的安全
  - configure(ClientDetailsServiceConfigurer clients)：配置 ClientDetailsService 也就是客户端属性信息

***ResourceServerConfigurerAdapter***

- 通过继承该类并重写 configure 方法来配置资源服务器： 
  - configure(org.springframework.security.config.annotation.web.builders.HttpSecurity http)：配置资源的访问规则
  - configure(ResourceServerSecurityConfigurer resources)：添加资源服务器特定的属性（如资源ID），默认值适用于很多情况，但至少需要修改下ID

***TokenStore***

- OAuth2 Token（令牌）持久化接口，用于定义 Token 如何存储，它有几个实现类： 
  - InMemoryTokenStore：实现了在内存中存储令牌
  - JdbcTokenStore：通过 JDBC 方式存储令牌
  - JwtTokenStore：通过 JWT 方式存储令牌

***TokenEnhancer***

- 可用于自定义令牌策略，在令牌被 AuthorizationServerTokenServices 的实现存储之前增强令牌的策略，它有两个实现类： 
  - JwtAccessTokenConverter：用于令牌 JWT 编码与解码
  - TokenEnhancerChain：一个令牌链，可以存放多个令牌，并循环的遍历令牌并将结果传递给下一个令牌

**TokenEndpoint**

- 该类根据 OAuth2 规范实现了令牌端点，客户端必须使用 Spring Security 身份验证来访问此端点，并从身份验证令牌客户端 ID，根据 OAuth2 规范，使用标准的 Spring Security 的 HTTP Basic 验证

**AuthorizationServerTokenServices**

- 该接口定义了一些操作可以对令牌进行一些管理，包含了三个方法声明： 
  - createAccessToken(OAuth2Authentication authentication)：从 OAuth2Authentication 对象中创建令牌
  - getAccessToken(OAuth2Authentication authentication)：从 OAuth2Authentication 对象中获取令牌
  - refreshAccessToken(String refreshToken, TokenRequest tokenRequest)：刷新令牌

**OAuth2AuthenticationDetails**

- HTTP 请求中资源所有者（用户）相关的 OAuth2 Authentication（身份验证）信息，它可通过 SecurityContext 获得

```
Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
Object details = authentication.getDetails();
```

- 它有几个方法： 
  - getDecodedDetails()：
  - getRemoteAddress()：Authentication（身份验证）请求的 TCP/IP 地址
  - getSessionId()：Authentication（身份验证）请求的 SessionID
  - getTokenValue()：请求中包含的的令牌信息（通常在请求头中）
  - setDecodedDetails(Object decodedDetails)：设置令牌
  - getDecodedDetails()：解码请求中包含的令牌
  - getTokenType()：获取 Token 类型，例如 Bearer

**ResourceServerTokenServices**

- 令牌业务类接口，它定义了两个方法： 
  - loadAuthentication(String accessToken)：加载 Authentication 验证信息
  - readAccessToken(String accessToken)：读取令牌
- 它有两个实现类： 
  - DefaultTokenServices：详情看下面
  - RemoteTokenServices：通过访问授权服务器 /check_token 端点来获取、解析令牌，如果端点返回 400 相应则表示该令牌无效

**DefaultTokenServices**

- 该类主要实现了 ResourceServerTokenServices、AuthorizationServerTokenServices、ConsumerTokenServices 三个接口
- 它包含了令牌业务的实现，如创建令牌、读取令牌、刷新令牌、撤销令牌、获取客户端ID。默认的当尝试创建一个令牌时，是使用 UUID 随机值进行填充的
- 除了持久化令牌是委托一个 TokenStore 接口实现以外，这个类几乎帮你做了所有事情

**AuthorizationEndpoint**

- 该类根据 OAuth2 规范实现了授权端点，如果授权类型是授权码模式，则处理用户批准，令牌是从令牌端点获得的，默认是支持除了密码授权外所有标准授权类型
- 它使用 AuthorizationServerEndpointsConfigurer 该类实例对象来进行配置，它可配置以下属性： 
  - authenticationManager：认证管理器，当你选择了资源所有者密码（password）授权类型的时候，请设置这个属性注入一个 AuthenticationManager 对象
  - userDetailsService：可定义自己的 UserDetailsService 接口实现
  - authorizationCodeServices：用来设置收取码服务的（即 AuthorizationCodeServices 的实例对象），主要用于 "authorization_code" 授权码类型模式
  - implicitGrantService：这个属性用于设置隐式授权模式，用来管理隐式授权模式的状态
  - tokenGranter：完全自定义授权服务实现（TokenGranter 接口实现），只有当标准的四种授权模式已无法满足需求时

**OAuth2AuthenticationProcessingFilter**

- OAuth2 受保护资源的预设认证过滤器，从请求中提取 OAuth2 令牌，并将令牌传入 OAuth2Authentication，（如果与OAuth2AuthenticationManager结合使用）传入Spring Security上下文

***ClientDetailsService***

- 提供有关 OAuth2 客户端的详细信息的服务，该接口仅声明了一个方法： 
  - loadClientByClientId(String clientId)：通过客户端名字加载客户端详情
- 它有两个实现类： 
  - InMemoryClientDetailsService：客户端详细信息服务的内存实现
  - JdbcClientDetailsService：客户端详细信息服务的 JDBC 实现，它会从数据库中读取客户端详情

***AccessTokenConverter***

- 令牌服务实现的转换器接口，用于将令牌数据存储在令牌中
- 它有两个实现类： 
  - JwtAccessTokenConverter：用于令牌 JWT 编码与解码
  - DefaultAccessTokenConverter：AccessTokenConverter 的默认实现

**OAuth2AccessToken**

- OAuth2 Token（令牌）实体类，包含了令牌、类型（Bearer）、失效时间等

**OAuth2ClientProperties**

- OAuth2 Client（客户端）属性配置实体类

**OAuth2ProtectedResourceDetails**

- OAuth2 受保护资源（资源服务器）的配置实体类

**AuthorizationServerProperties**

- OAuth2 Authentication（授权服务器）属性配置实体类

**ResourceServerProperties**

- OAuth2 为资源服务器配置提供了 ResourceServerProperties 类，该类会读取配置文件中对资源服务器得配置信息（如授权服务器公钥访问地址）

**ClientDetails**

- 客户端详情接口，声明了获取客户端详情所需的一些方法，比如获取访问令牌失效时间、获取客户端权限、获取客户端 ID、获取客户端访问范围等方法

**AuthorizationServerProperties**

- OAuth2授权服务器的配置属性



### 7. 单点登录（SSO）

![img](https://images2018.cnblogs.com/blog/874963/201807/874963-20180711181735072-935217297.png)

![单点登陆](C:\Users\suoju\Downloads\单点登陆.svg)
