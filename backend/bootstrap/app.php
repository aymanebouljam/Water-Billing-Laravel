<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
            $exceptions->render(function (Throwable $e, $request) {
                if ($request->expectsJson() || $request->is('api/*')) {
                    log::error('Internal Server Error '. $e->getMessage());
                    return new JsonResponse([
                        'message' => 'Erreur serveur interne',
                    ], 500);
                }
            });
            $exceptions->render(function (ModelNotFoundException $e, $request) {
                if ($request->expectsJson() || $request->is('api/*')) {
                    Log::error('Model not found: ' . $e->getMessage());
                    return new JsonResponse([
                        'message' => 'Non trouvée',
                    ], 404);
                }
            });
    })->create();
