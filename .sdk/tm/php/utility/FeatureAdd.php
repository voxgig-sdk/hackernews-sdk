<?php
declare(strict_types=1);

// Hackernews SDK utility: feature_add

class HackernewsFeatureAdd
{
    public static function call(HackernewsContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
