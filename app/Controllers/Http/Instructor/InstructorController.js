'use strict'

const Task = use('App/Models/Task')
const Helpers = use('Helpers')
const Score = use('App/Models/Score')

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

	async show({ request, response, auth })
	{
		const user_id = auth.user.id

		const data = await Task.query().where({user_id}).fetch()
		return response.status(200).send(data)
	}

	/*
   UPDATE SCORE OF PARTICULAR TASK OF PARTICULAR USER
	*/

	async update({ request, response })
	{
		  const { user_id, task_id } = request.params
	  	const score = request.all()

		  const scoretask = await Score.findBy({user_id, task_id})
		  await scoretask.merge({score})
		  await scoretask.save()
	}

	/*
   LISTS ALL THE STUDENTS WHO HAS COMPLETED THE SPECIFIC TASK
	*/

	async get({ request, response })
	{
		const task_id = request.params.task_id
		const data = await Score.query().where({task_id}).fetch()

		return response.status(200).send(data)
	}

}

module.exports = InstructorController
