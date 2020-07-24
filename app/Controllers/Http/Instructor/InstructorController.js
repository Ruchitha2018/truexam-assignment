'use strict'

const Task = use('App/Models/Task')
const Helpers = use('Helpers')

class InstructorController {

   /*
     ADD TASK
   */

	async store({ request, response, auth }) 
	{
		const { title, desc } = request.all()
		const user_id = auth.user.id

		const image =  request.file('image', { types: ['image']})
		await image.move(Helpers.tmpPath('uploads'), {
			name: `${new Date().getTime()}.${image.subtype}`,
		})

       const data = await Task.create({ title, desc, "image": image.fileName, user_id })
	   return response.status(200).send(data)
	}

	/*
       LIST TASK
	*/
}

module.exports = InstructorController

