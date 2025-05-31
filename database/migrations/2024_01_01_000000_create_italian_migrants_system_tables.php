
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Italian Migrants Table
        Schema::create('italian_migrants', function (Blueprint $table) {
            $table->id();
            $table->integer('person_id')->unique();
            $table->string('surname');
            $table->string('christian_name');
            $table->string('full_name')->virtualAs('CONCAT(christian_name, " ", surname)');
            $table->year('date_of_birth')->nullable();
            $table->string('place_of_birth')->nullable();
            $table->year('date_of_death')->nullable();
            $table->string('occupation')->nullable();
            $table->text('additional_notes')->nullable();
            $table->string('reference')->nullable();
            $table->string('id_card_no')->nullable();
            $table->json('photos')->nullable();
            
            // Family information
            $table->string('names_of_parents')->nullable();
            $table->text('names_of_children')->nullable();
            
            // Naturalization information
            $table->date('date_of_naturalisation')->nullable();
            $table->string('no_of_cert')->nullable();
            $table->string('issued_at')->nullable();
            
            // Residence information
            $table->string('town_or_city')->nullable();
            $table->string('home_at_death')->nullable();
            
            // Migration information
            $table->date('date_of_arrival_aus')->nullable();
            $table->date('date_of_arrival_nt')->nullable();
            $table->string('arrival_period')->nullable();
            $table->string('data_source')->nullable();
            
            $table->boolean('has_photo')->default(false);
            $table->timestamps();
            
            // Indexes for better search performance
            $table->index(['surname', 'christian_name']);
            $table->index('date_of_birth');
            $table->index('date_of_arrival_nt');
            $table->index('place_of_birth');
            $table->index('town_or_city');
            $table->index('occupation');
            $table->fullText(['surname', 'christian_name', 'full_name', 'place_of_birth', 'occupation']);
        });

        // Admin Users Table
        Schema::create('admin_users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->enum('role', ['Super Admin', 'Editor', 'Viewer'])->default('Viewer');
            $table->enum('status', ['Active', 'Inactive'])->default('Active');
            $table->string('profile_picture')->nullable();
            $table->timestamp('last_login')->nullable();
            $table->rememberToken();
            $table->timestamps();
            
            $table->index('email');
            $table->index('role');
            $table->index('status');
        });

        // Analytics Data Table (for caching)
        Schema::create('analytics_cache', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->json('data');
            $table->timestamp('expires_at');
            $table->timestamps();
            
            $table->index('key');
            $table->index('expires_at');
        });

        // Search Logs Table
        Schema::create('search_logs', function (Blueprint $table) {
            $table->id();
            $table->json('search_filters');
            $table->integer('results_count');
            $table->string('ip_address')->nullable();
            $table->string('user_agent')->nullable();
            $table->timestamps();
            
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('search_logs');
        Schema::dropIfExists('analytics_cache');
        Schema::dropIfExists('admin_users');
        Schema::dropIfExists('italian_migrants');
    }
};
