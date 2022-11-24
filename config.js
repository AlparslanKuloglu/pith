module.exports={
    api_secret_key:'pithgrowth secret key',
    port:process.env.PORT,
    local_client_app: process.env.LOCAL_SERVER_APP,
    remote_client_app: process.env.REMOTE_SERVER_APP,
    allowedDomains: (process.env.NODE_ENV === 'production' ? 
    [process.env.REMOTE_CLIENT_APP,process.env.REMOTE_SERVER_APP]
    :
    [process.env.LOCAL_CLIENT_APP,process.env.LOCAL_SERVER_APP]
    )
}