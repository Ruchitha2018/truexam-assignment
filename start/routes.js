'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')

Route.post('api/auth/register', 'UserController.register')
Route.post('api/auth/login', 'UserController.login').middleware('guest')

//Instructor Task Route
Route.group(() => {
	Route.post('task', 'Instructor/InstructorController.store')
	Route.get('task', 'Instructor/InstructorController.get')
})
.prefix(`/api/instructor`)
.middleware(['auth:user', 'instructor'])