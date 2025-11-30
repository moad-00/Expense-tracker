<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTsakRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:40'],
            'description' => 'nullable|string|max:100',
            'amount'=> 'required|integer|min:0'


        ];
    }
    public function messages()
{
    return [
        'name.string' => 'Name must be text only.',
        'name.max' => 'Name can’t exceed 40 characters.',
        'name.regex' => 'Name must contain at least one letter.',
        'amount.integer' => 'Amount must be a number.',
    ];
}

}
