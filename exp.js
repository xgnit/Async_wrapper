String.prototype.format = function () {
  var i = 0, args = arguments;
  return this.replace(/{}/g, function () {
    return typeof args[i] != 'undefined' ? args[i++] : '';
  });
};

var bar1 = 'foobar',
    bar2 = 'jumped',
    bar3 = 'dog';

'The lazy {} {} over the {}'.format(bar3, bar2, bar1);
// "The lazy dog jumped over the foobar"


function run_cmd_async(cmd, filter = "") {
    return new Promise(function (resolve, reject) {
        exec(cmd, function(err,stdout,stderr){
            if(err)
            {
            	if(filter)
                {
                	if(stderr.includes(filter))
                		resolve(stderr)
                	else
                		reject(stderr)
                }
                else
                {
	             	if(cmd.includes('ps | grep'))
	             	{
	             		if(0 == stderr.length)
	             			resolve('no_process_found')
	             		else
	             			reject(stderr)
	             	}
	            	else if(cmd.includes('udhcpc'))
	            	{
	            		if(stderr.includes('udhcpc: started'))
	            			resolve('udhcpc_started_but_other_places_have_error')
	            		else
	            			reject(stderr)
	            	}
                }



            }
            else
                resolve(stdout)
        })
    })
}

async function run_cmd_async_wrapper(cmd, filter = "")
{
	try{
		var res = await run_cmd_async(cmd, filter)
	}catch(err){
		error_handler_async(err)
	}
	return res
}