<?php
declare(strict_types=1);

// Hackernews SDK exists test

require_once __DIR__ . '/../hackernews_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = HackernewsSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
