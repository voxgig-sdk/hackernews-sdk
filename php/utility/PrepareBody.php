<?php
declare(strict_types=1);

// Hackernews SDK utility: prepare_body

class HackernewsPrepareBody
{
    public static function call(HackernewsContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
