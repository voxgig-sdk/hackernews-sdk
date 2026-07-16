<?php
declare(strict_types=1);

// Hackernews SDK base feature

class HackernewsBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(HackernewsContext $ctx, array $options): void {}
    public function PostConstruct(HackernewsContext $ctx): void {}
    public function PostConstructEntity(HackernewsContext $ctx): void {}
    public function SetData(HackernewsContext $ctx): void {}
    public function GetData(HackernewsContext $ctx): void {}
    public function GetMatch(HackernewsContext $ctx): void {}
    public function SetMatch(HackernewsContext $ctx): void {}
    public function PrePoint(HackernewsContext $ctx): void {}
    public function PreSpec(HackernewsContext $ctx): void {}
    public function PreRequest(HackernewsContext $ctx): void {}
    public function PreResponse(HackernewsContext $ctx): void {}
    public function PreResult(HackernewsContext $ctx): void {}
    public function PreDone(HackernewsContext $ctx): void {}
    public function PreUnexpected(HackernewsContext $ctx): void {}
}
