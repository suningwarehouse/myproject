/**
 * Created by 11076994 on 2017/3/12.
 */
export default app=>{
    app.service('userService',['HttpService',HttpService=>{
        return{
            'getSelectUsers':() =>HttpService.get("user/getSelectUsers"),
            'getFullName':() =>HttpService.get("user/getFullName"),
            'getAndUpdateUser': params =>HttpService.get("user/getAndUpdateUser/"+params)
        }
        }])
        
        app.factory('DetecEnv',()=>()=>{
        	if (location.hostname.match('sit')) {
            	return 'sit'
            } else if (location.hostname.match("dev")) {
            	return 'dev'
            } else if (location.hostname.match('pre')) {
            	return 'pre'
            } else {
            	return ''
            }
        })
}
