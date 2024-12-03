<template>
	<div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
		<div class="text-center animate-fade-in">
			<h1 class="text-9xl font-bold text-gray-900 animate-shake">403</h1>
			<p class="mt-4 text-2xl text-gray-600 animate-slide-up">Acceso Denegado</p>
			<p class="mt-2 text-gray-500 animate-slide-up delay-100">No tienes permisos para acceder a esta página</p>
			<router-link to="/"
				class="mt-8 inline-block px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transform hover:scale-105 transition-all duration-300">
				Volver al inicio
			</router-link>
		</div>
	</div>
</template>

<style scoped>
@keyframes shake {

	0%,
	100% {
		transform: translateX(0);
	}

	10%,
	30%,
	50%,
	70%,
	90% {
		transform: translateX(-5px);
	}

	20%,
	40%,
	60%,
	80% {
		transform: translateX(5px);
	}
}

.animate-shake {
	animation: shake 0.8s cubic-bezier(.36, .07, .19, .97) infinite;
}

@keyframes fade-in {
	from {
		opacity: 0;
	}

	to {
		opacity: 1;
	}
}

@keyframes float {

	0%,
	100% {
		transform: translateY(0);
	}

	50% {
		transform: translateY(-20px);
	}
}

@keyframes slide-up {
	from {
		transform: translateY(20px);
		opacity: 0;
	}

	to {
		transform: translateY(0);
		opacity: 1;
	}
}

.animate-fade-in {
	animation: fade-in 1s ease-out;
}

.animate-float {
	animation: float 6s ease-in-out infinite;
}

.animate-slide-up {
	animation: slide-up 0.8s ease-out forwards;
}

.delay-100 {
	animation-delay: 100ms;
}
</style>