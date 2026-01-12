// apps/api/tests/Functional/ContentApiTest.php
<?php
namespace App\Tests\Functional;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;

class ContentApiTest extends ApiTestCase
{
public function testGetContentsAsAuthenticatedUser(): void
{
// Login pour obtenir le token JWT
$response = static::createClient()->request('POST', '/api/login_check', [
'json' => [
'username' => 'user1@cesizen.fr', // adapte à tes fixtures
'password' => 'password123'
]
]);

$this->assertResponseIsSuccessful();
$data = $response->toArray();
$token = $data['token'];

// Requête GET sur /api/contents avec authentification
static::createClient()->request('GET', '/api/contents', [
'headers' => [
'Authorization' => 'Bearer ' . $token,
'Accept' => 'application/ld+json',
],
]);

$this->assertResponseIsSuccessful();
$this->assertResponseStatusCodeSame(200);
$this->assertJsonContains([
'@context' => '/api/contexts/Content',
]);
}
}
