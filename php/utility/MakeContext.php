<?php
declare(strict_types=1);

// Hackernews SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class HackernewsMakeContext
{
    public static function call(array $ctxmap, ?HackernewsContext $basectx): HackernewsContext
    {
        return new HackernewsContext($ctxmap, $basectx);
    }
}
