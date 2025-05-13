import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Observation, Severity, Status } from '../types';
import { saveObservation } from '../utils/storage';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '../components/ui/form';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Button } from '../components/ui/button';
import { useForm } from "react-hook-form";

const CreateObservation = () => {
  const navigate = useNavigate();
  const form = useForm<Partial<Observation>>({
    defaultValues: {
      title: '',
      description: '',
      severity: 'Medium',
      status: 'Open',
      assignedTo: '',
    }
  });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    form.setValue(name as keyof Observation, value);
  };

  const handleSelectChange = (name: keyof Observation, value: string) => {
    form.setValue(name, value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const onSubmit = (data: Partial<Observation>) => {
    const newObservation: Observation = {
      id: crypto.randomUUID(),
      ...data as Omit<Observation, 'id'>,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      evidence: preview || undefined,
      evidenceName: file?.name,
    };
    saveObservation(newObservation);
    navigate('/observations');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Observation</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="severity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Severity</FormLabel>
                <FormControl>
                  <Select {...field} onValueChange={(value) => handleSelectChange('severity', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="assignedTo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assigned To</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="evidence"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Supporting Evidence</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    {...field}
                    onChange={handleFileChange}
                  />
                </FormControl>
                {preview && (
                  <div className="mt-2">
                    <img src={preview} alt="Preview" className="max-w-xs rounded-lg shadow" />
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => navigate('/observations')}>
              Cancel
            </Button>
            <Button type="submit">Create Observation</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateObservation; 