<?php
declare(strict_types=1);

// Hackernews SDK utility: result_headers

class HackernewsResultHeaders
{
    public static function call(HackernewsContext $ctx): ?HackernewsResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
