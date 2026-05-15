<?php
declare(strict_types=1);

// Hackernews SDK utility: result_body

class HackernewsResultBody
{
    public static function call(HackernewsContext $ctx): ?HackernewsResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
