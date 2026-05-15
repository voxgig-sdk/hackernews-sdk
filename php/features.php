<?php
declare(strict_types=1);

// Hackernews SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class HackernewsFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new HackernewsBaseFeature();
            case "test":
                return new HackernewsTestFeature();
            default:
                return new HackernewsBaseFeature();
        }
    }
}
