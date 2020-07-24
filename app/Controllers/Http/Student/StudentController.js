'use strict'
const Score = use('App/Models/Score')
const Task = use('App/Models/Task')
const Helpers = use('Helpers')

class StudentController {

/*
  UPLOADS IMAGE TO THE SPECIFIC TASK
*/
 async store({ request, response, auth })
 {
   const task_id = request.params.task_id
   const user_id = auth.user.id

   const image =  request.file('image', { types: ['image']})
   await image.move(Helpers.tmpPath('uploads'), {
     name: `${new Date().getTime()}.${image.subtype}`,
   })

   const data = await Score.create({  task_id, "image": image.fileName, user_id, score:"0" })
   return response.status(200).send(data)
 }

  /*
	LIST ALL TASKS
	*/
	async show({ request, response })
	{
		const data = await Task.query().fetch()
		return response.status(200).send(data)
	}
}

module.exports = StudentController
