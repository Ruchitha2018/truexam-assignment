'use strict'

const User = use('App/Models/User')

class UserController {

	async register({ request, response }) 
	{
		const { username, password, email, role } = request.all()
		const data = await User.create({username, password, email, role})
		return response.status(200).send(data)
	}

	async login({ request, response, auth })
	{
        const { email, password } = request.all()
        const data = await auth.attempt(email, password)
        return response.status(200).send(data)
	}

}

module.exports = UserController

