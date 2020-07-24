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

Route.on('/').render('auth.register')

Route.post('api/auth/register', 'UserController.register')
Route.post('api/auth/login', 'UserController.login').middleware('guest')

//Instructor Task Route
Route.group(() => {
	Route.post('task', 'Instructor/InstructorController.store')
	Route.get('task', 'Instructor/InstructorController.show')
	Route.put('task/:task_id/:user_id/score', 'Instructor/InstructorController.update')
})
.prefix(`api/instructor`)
.middleware(['auth:user', 'instructor'])

//Lists all students of specific task
Route.get('api/instructor/:task_id/students', 'Instructor/InstructorController.get')
				 .middleware(['auth:user', 'instructor'])

//Lists all tasks to the Student
Route.get('api/student/tasks', 'Student/StudentController.show')
     .middleware(['auth:user', 'student'])

//Student Upload image
Route.post('api/student/image/task/:task_id', 'Student/StudentController.store')
     .middleware(['auth:user', 'student'])
